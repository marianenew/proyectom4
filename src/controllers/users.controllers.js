import {User} from '../models/users.js';
import { Task } from '../models/tasks.js';
import logger from '../logs/logger.js';
import { Status } from '../constants/index.js';
import { Model } from 'sequelize';

async function getUsers(req,res) {
    try {
        const users = await User.findAll({
            attributes:['id','username','password','status'],
            order : [['id','DESC']],
            where : {
                status: Status.ACTIVE,
            },
        });
        res.json(users);
    }catch (error) {
        logger.error('Error getUsers: ' + error);
        res.status(500).json({message:'Server error'});
    }
    
}

async function createUsers(req, res) {
    
    try {
        const { username, password } = req.body;
         const user =await User.create({ username, password });
         console.log(username);
        res.json(user);
    } catch (error) {
        logger.error('Error createUsers: ' + error);
        res.status(500).json({message:'Server error'});
    }
    
}

async function getUser(req,res){
    try{
        const user=await User.findByPk(req.params.id, {
            attributes:['username','status']
        });
        if (!user){
            return res.status(400).json({message:'User no fount'});
        }
        res.json(user);
    } catch (error) {
        logger.error('Error getUser: ' + error);
        res.status(500).json({message:'Server error'})
    }
}

async function updateUser(req,res) {
    const { id}=req.params;
    const {username,password}=req.body;
    try{
       
        if (!username || !password)
            return res.status(400).json({message:'Username or Password requered'});
        
        
       //const user=await User.findByPk(id);
       const user=await User.update({
        username,
        password,
       },
       {
        where:{
            id,
        },
       }
    );
      res.json(user)
    } catch(error){
        logger.error('Error updateUser: ' + error);
        res.status(500).json({message:'Server error'});
    }
}

async function activeInactive(req,res) {
  const { id }  = req.params;
  const { status }=req.body;
  try{
    if(!status) return res.status(400).json({message:'Status is required'});
     const user=await User.findByPk(id);
     if(!user){
        return res.status(400).json({message: 'User not found'})
     }

     if (user.status===status)
        return res
            .status(400)
            .json({message:'Status is the same as the current one'});
        user.status=status;
        await user.save();
        res.json(user);
   
        } catch (error){
            logger.error('Error activateInactivate: ' + error);
            res.status(500).json({message:'Server error'});
        }
  }

  async function deleteUser(req,res) {
    const { id }  = req.params;
    try{
       const user=await User.findByPk(id);
       if(!user){
          return res.status(400).json({message: 'User not found'});
       }
          await user.destroy();
          res.json({message:'User deleted successfully'});
     
          } catch (error){
              logger.error('Error deleteUser: ' + error);
              res.status(500).json({message:'Server error'});
          }
    }


    async function gerTasks(req,res) {
        const { id }=req.params;
        try {
            const user=await User.findOne({
                attributes:['username'],
                include : [{
                    model: Task,
                    attributes:['name','done'],
                }],
                where:{ id },
            })
         res.json(user);
        }catch (error){
            logger.error('Error deleteUser: ' + error);
            res.status(500).json({message:'Server error'});
        }
        }
        
export default{
    getUsers,
    createUsers,
    getUser,
    updateUser,
    activeInactive,
    gerTasks,
    deleteUser
}