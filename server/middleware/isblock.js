const isBlock = (req, res, next) => {

    try {
      const { status } = req.body
  
      if (status === 'active') {
        return next();
      }
  
      res.status(403).json({
        message: 'Access denied: User is blocked or inactive',
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
      });
    }
  };
  
  export { isBlock };
  

