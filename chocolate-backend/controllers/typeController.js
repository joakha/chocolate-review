import TypeModel from "../mongodb/models/Type.js";

const createType = async (req, res) => {
    const type = new TypeModel(req.body);

    try {
        await type.save();
        res.status(200).json({info: "saving new type successful!"});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error creating new type!", err});
    }
}

const getTypes = async (req, res) => {
    try {
        const types = await TypeModel.find();
        res.status(200).json(types);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Error fetching types!", err});
    }
}

export {
    createType,
    getTypes
}