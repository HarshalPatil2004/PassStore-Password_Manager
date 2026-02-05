import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import process from 'process';
import cors from 'cors';

import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassStore';
const app = express();
const port = 3000;
app.use(cors())


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({ path: '/custom/path/to/.env' })

// Connect to MongoDB
async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        //Get all the Passwords for a specific device
        app.get('/', async (req, res) => {
            const deviceId = req.headers['device-id'];

            if (!deviceId) {
                return res.status(400).json({ error: 'Device ID is required' });
            }

            const db = client.db(dbName);
            const collection = db.collection('documents');
            const findResult = await collection.find({ device_id: deviceId }).toArray();
            console.log(`Found documents for device ${deviceId} =>`, findResult);
            res.json(findResult);
        });

        //Save a Password
        app.post('/', async (req, res) => {
            const deviceId = req.headers['device-id'];
            const deviceName = req.headers['device-name'];

            if (!deviceId) {
                return res.status(400).json({ error: 'Device ID is required' });
            }

            const db = client.db(dbName);
            const collection = db.collection('documents');

            // Check if password with this ID already exists for this device
            const existingPassword = await collection.findOne({ id: req.body.id, device_id: deviceId });

            if (existingPassword) {
                // Update existing password
                const updateResult = await collection.updateOne(
                    { id: req.body.id, device_id: deviceId },
                    { $set: { ...req.body, device_id: deviceId } }
                );
                console.log('Updated document =>', updateResult);
                res.json(updateResult);
            } else {
                // Insert new password with device_id
                const insertResult = await collection.insertOne({
                    ...req.body,
                    device_id: deviceId,
                    device_name: deviceName,
                    created_at: new Date()
                });
                console.log('Inserted document =>', insertResult);
                res.json(insertResult);
            }
        });

        //Delete a Password
        app.delete('/', async (req, res) => {
            const deviceId = req.headers['device-id'];

            if (!deviceId) {
                return res.status(400).json({ error: 'Device ID is required' });
            }

            const db = client.db(dbName);
            const collection = db.collection('documents');
            const deleteResult = await collection.deleteOne({ id: req.body.id, device_id: deviceId });
            console.log('Deleted document =>', deleteResult);
            res.json(deleteResult);
        });

        //Get all devices
        app.get('/devices', async (req, res) => {
            const db = client.db(dbName);
            const collection = db.collection('documents');
            const devices = await collection.aggregate([
                { $group: { _id: '$device_id', device_name: { $first: '$device_name' }, count: { $sum: 1 } } },
                { $sort: { _id: -1 } }
            ]).toArray();
            console.log('Found devices =>', devices);
            res.json(devices);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

