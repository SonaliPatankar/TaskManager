const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed','In Progress'],
        default: 'Pending',
    },
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Ensure this line exists
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
