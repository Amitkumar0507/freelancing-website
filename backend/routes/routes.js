import express from "express";

import {loginFun,userPortfolio,adminLogin,verifyLogin,createSession,registerFun,addJob,addProject,getAllProjects,getChatPartners,getAllJobs,getUserDetails,sendMessage,loadChatMessages,addUserToChatList} from "../controller/controller.js";
import { admin } from "../firebase_admin.js";

const router = express.Router();

router.post("/login",loginFun);
router.post("/data",userPortfolio);
router.post("/admin",adminLogin);
router.get("/check-auth",verifyLogin);
router.post("/jwtSession",createSession);
router.post("/register",registerFun);
router.post("/jobs",addJob);
router.post("/projects",addProject);
router.get("/getProjects",getAllProjects);
router.get("/getJobs",getAllJobs);
router.get("/userdetails",getUserDetails);
// router.post("/get-user", getOrCreateChat);
router.post("/sendmessage", sendMessage); 
router.post("/addusertochatlist", addUserToChatList);
router.get("/getpartners/:userId", getChatPartners);
router.get("/chatload/:userId/:friendId", loadChatMessages);
export default router;
