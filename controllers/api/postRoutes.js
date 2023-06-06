const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
const path = require('path');

//multer code
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ 
  storage: storage,
  limits: {fileSize: '1000000'},
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if(mimType && extname) {
      return cb(null, true)
    }
    cb('Give proper files format to upload')
  } 
}).single('image')


router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll();
        console.log(postData);
      // Serialize data so the template can read it
  
      // Pass serialized data and session flag into template
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', upload, async (req, res) => {
  const newPostData = {
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
  }
  if (req.file){
    newPostData.image = req.file.path;
  }
  
  try {
    const newPost = await Post.create(newPostData);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;