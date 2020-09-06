import mongoose from "mongoose";

function connect(connectionString: string): Promise<mongoose.Mongoose> {
    return mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err: mongoose.Error) => {
        if (err) {
            console.error("Error connecting to database:", err);
            process.exit(1);
        } else {
            console.log("Connected to database");
        }
    });
};

function disconnect(): Promise<void> {
    return mongoose.disconnect()
        .then(() => console.log("Disconnected from database"))
        .catch(() => console.error("Error while disconnecting from database"));
}

export { connect, disconnect };