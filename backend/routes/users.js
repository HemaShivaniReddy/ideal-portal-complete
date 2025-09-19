import express from 'express'; import User from '../models/User.js'; import { auth, permit } from '../middleware/auth.js'; const router = express.Router();
router.get('/', auth, permit('admin'), async (req,res)=>{ try{ const users = await User.find().select('-password -otp -otpExpires'); res.json(users); }catch(e){ res.status(500).json({message:'err'}); } });
router.put('/:id/role', auth, permit('admin'), async (req,res)=>{ try{ const { role } = req.body; if(!['manager','expert','user'].includes(role)) return res.status(400).json({message:'Invalid'}); const u = await User.findByIdAndUpdate(req.params.id, { role }, { new:true }).select('-password'); res.json(u); }catch(e){ res.status(500).json({message:'err'}); } });
export default router;
