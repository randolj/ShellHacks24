const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const corsOptions = {
    origin: true, // Allow only requests from your React application
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
