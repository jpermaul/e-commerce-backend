const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })

  .then(data => res.json(data))
  .catch(err => res.json(err))
  
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  }, {Where: {id: req.params.id}})

  .then(data => res.json(data))
  .catch(err => res.json(err))
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(data => res.json(data))
  .catch(err => res.json(err))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{where: {id: req.params.id}})
  .then(data => res.json(data))
  .catch(err => res.json(err))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where: {id: req.params.id}})
  .then(data => res.json(data))
  .catch(err => res.json(err))
});

module.exports = router;
