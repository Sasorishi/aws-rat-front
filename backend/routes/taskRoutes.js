const express = require('express');
const router = express.Router();
const db = require('../models');

// Récupérer toutes les tâches, y compris leurs tâches enfants et utilisateurs assignés
router.get('/', async (req, res) => {
    try {
      const tasks = await db.Task.findAll({
        include: [
          {
            model: db.Task,
            as: 'children',
          },
          {
            model: db.User,
            as: 'users',
            attributes: ['id', 'username', 'color'], // Inclure seulement ces attributs
            through: { attributes: [] }, // Exclure la relation UserTasks
          },
        ],
      });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Créer une nouvelle tâche
router.post('/', async (req, res) => {
  try {
    const { users, parentId, ...taskData } = req.body;
    const task = await db.Task.create(taskData);

    // Ajouter les relations parent-enfant si parentId est fourni
    if (parentId) {
      const parentTask = await db.Task.findByPk(parentId);
      if (parentTask) {
        await task.setParent(parentTask);
      }
    }

    // Assigner des utilisateurs à la tâche si des utilisateurs sont fournis
    if (users && users.length > 0) {
        const userInstances = await db.User.findAll({
          where: { id: users },
        });
        
        // Utilise un forEach pour associer chaque utilisateur à la tâche
        for (const user of userInstances) {
            await task.addUser(user);
          }
      }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour une tâche
router.put('/:id', async (req, res) => {
  try {
    const { users, parentId, ...taskData } = req.body;
    const task = await db.Task.findByPk(req.params.id);

    if (task) {
      await task.update(taskData);

      // Mettre à jour la relation parent-enfant
      if (parentId) {
        const parentTask = await db.Task.findByPk(parentId);
        if (parentTask) {
          await task.setParent(parentTask);
        }
      } else {
        await task.setParent(null);
      }

      // Mettre à jour les utilisateurs assignés
      if (users && users.length > 0) {
        const userInstances = await db.User.findAll({
          where: { id: users },
        });
        await task.setUsers(userInstances);
      }

      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer une tâche
router.delete('/:id', async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.id);

    if (task) {
      // Réinitialiser l'identifiant parent des tâches enfants
      await db.Task.update({ parentId: null }, { where: { parentId: task.id } });
      
      // Supprimer la tâche
      await task.destroy();
      res.status(200).json({message : "Tache supprimée"});
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
