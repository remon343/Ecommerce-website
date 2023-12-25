const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(Object.assign({},req.body));
    console.log(parseBody);
    req.body = parseBody;
    next();
  } catch (err) {
    return res.status(500).json({ msg: (err.issues && err.issues.length > 0 ? err.issues[0].message : err.message)  });
  }
};  

module.exports = validate;
