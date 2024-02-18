const hasContent = (attributes) => (req, res, next) => {
    let hasRequiredAttributes = true;
    
    attributes.forEach(element => {
        hasRequiredAttributes = hasRequiredAttributes && req.body[element] != undefined && req.body[element] != null; 
    });

    if (!hasRequiredAttributes) {
        res.status(400).json({ error: "One or more required attributes is missing from the request body." });
        return;
    }

    next();
};
  
module.exports = hasContent;