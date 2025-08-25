const express = require('express');
const router = express.Router();
const { Pet } = require('../models');

// Criar um Pet para um dono
router.post('/', async (req, res) => {
    try {
        const pet = await Pet.create(req.body);
        res.status(201).json(pet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar todos os pets
router.get('/', async (req, res) => {
    try {
        const pet = await Pet.findAll();
        res.json(pet);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
});

// Listar uma 
router.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);
        if (!pet) return res.status(404).json({
            error: 'Pet nao encontrado'
        });
        res.json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Deletar um pet
router.delete('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id);
        if (!pet) return res.status(404).json({
            error: 'Pet nao encontrado'
        });
        await pet.destroy();
        res.json({message: 'Pet excluido'});
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

//Editar um pet
router.put('/:id', async (req, res) => {
    try {
        const pet = await Pet.findByPk(req.params.id)
        if (!pet) return res.status(404).json({
            error: 'Pet nao encontrado'
        });

        await pet.update(req.body);
        res.json(pet);
    } catch (error) {
        res.status(400).json({

           error: error.message 
        });
    }
});

module.exports = router;