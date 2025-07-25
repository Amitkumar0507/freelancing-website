import { db ,admin } from "../firebase_admin.js";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  arrayUnion, 
  setDoc, 
  doc, 
  addDoc, 
  getDocs, 
  where ,
  FieldValue 
} from "firebase/firestore";

import jwt from "jsonwebtoken";

const loginFun = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Email and password must be strings" });
    }

    const usersRef = db.collection("users");
    const querySnapshot = await usersRef.where("email", "==", email).get();

    if (querySnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: userDoc.id, email }, // payload
      "your_jwt_secret",         // replace with process.env.JWT_SECRET
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in prod
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful", id: userDoc.id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const registerFun = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({ message: "Credentials are missing" });
    }
    const userRef = db.collection("users");
    const query = await userRef.where("email","==",email).get();
    if(!query.empty)
    {
      return res.status(400).json({message:"User already exists"});
    }
    const registerData = { username, email, password };

    try {
      const docRef = await db.collection("users").add(registerData);
      const token = jwt.sign(
        { id: docRef.id, email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ message: "Registration successful", id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userPortfolio = async (req,res)=>
{
    try {
      const { email, name, tag_line, bio, skills, projects} = req.body;
      const userData =  { email, name, tag_line, bio, skills, projects  };
      try {
        const docVal = await db.collection("usersInfo").add(userData);
        res.status(200).json({message:"success"});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const adminLogin = async (req,res) =>
{
      try {
          const {email,password} = await req.body;
          if(email!=='mithunan600@gmail.com')
          {
            return res.status(400).json({message:"Invalid Email"});
          }
          else if(password !== "Mithun@123")
          {
            return res.status(400).json({message:"Invalid password"});
          }
          return res.status(200).json({message:"Admin Login successfull"});
        } catch (error) {
        res.status(500).json({error:error.message});
        }
} 

const verifyLogin = async (req,res) =>
{
  const token = req.cookies.token;
  if(!token)
  {
    return res.json({user : null});
  }

  try {
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    return res.json({user : decode});
  } catch (error) {
    return res.json({user:null});
    
  }

}

const createSession = async (req,res)=>
{
  const {idToken} = req.body;
  console.log(idToken);
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    if(!decoded) return res.status(401).json({message:"User Does not exist"})
    const {uid,email} = decoded;
    const customJwt = jwt.sign({uid,email},process.env.JWT_SECRET,{
      expiresIn:"7d",
    })
    res.cookie("token",customJwt,{
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.status(200).json({ message: "Login success" });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ error: "Unauthorized" });
  }
}

const addJob = async (req,res) =>
{
  try {
    const {title,company,location,job_type,exp,skills,link} = await req.body;
    if(!title || !company || !location || !job_type || !exp || !skills || !link)
    {
      return res.status(401).json({message:"Credentials are missing"});
    }
    const jodDetails =  {title,company,location,job_type,exp,skills,link};
    try {
      await db.collection("jobs").add(jodDetails);
      return res.status(200).json({message:"Job Added successfully"});
    } catch (error) {
      return res.status(401).json({error:error.message});
      
    }
  } catch (error) {
    res.status(500).json({error:error.message});
  }
}

const addProject = async (req,res) =>
{
  try {
    const {title,description,skills,duration,githubLink,liveLink,username,user_email} = await req.body;
    if(!title || !description || !skills || !duration || !githubLink || !liveLink || !username || !user_email)
    {
      return res.status(401).json({message:"Credentials are missing"});
    }
    const projectDetails = {title,description,skills,duration,githubLink,liveLink,username,user_email};
    try {
      await db.collection("projects").add(projectDetails);
      return res.status(200).json({message:"project Added successfully.!!!"});
    } catch (error) {
      return res.status(400).json({error:error.message});
    }
    
  } catch (error) {
    return res.status(500).json({error:error.message});
  }
}

const getAllProjects = async (req, res) => {
  try {
    const snapshot = await db.collection("projects").get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json({ projects });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllJobs =  async (req,res) =>
{
  try {
    const snapshot = await db.collection("jobs").get();
    const jobs = snapshot.docs.map(doc =>({id:doc.id,...doc.data()}));
    return res.status(200).json({jobs});
  } catch (error) {
    return res.status(500).json({error:error.messages});
  }
}

const getUserDetails = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const snapshot = await db
      .collection("usersInfo")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) {
      return res.status(404).json(null);
    }

    const userDoc = snapshot.docs[0];
    const userData = { id: userDoc.id, ...userDoc.data() };

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addUserToChatList = async (req, res) => {
  const { userId, friendId } = req.body; // emails or unique IDs

  if (!userId || !friendId) {
    return res.status(400).json({ error: "userId and friendId are required" });
  }

  try {
    const userDocRef = db.collection("usersChatList").doc(userId);

    await userDocRef.set(
      {
        chatList: admin.firestore.FieldValue.arrayUnion(friendId),  // Correct usage
        updatedAt: admin.firestore.FieldValue.serverTimestamp()      // Use serverTimestamp
      },
      { merge: true }  // Merge the new data with the existing data
    );

    return res.status(200).json({ message: `Added ${friendId} to ${userId}'s chat list` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getChatPartners = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a URL parameter

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    // Reference to the user's chat list document
    const userDocRef = db.collection("usersChatList").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: `User ${userId} not found` });
    }

    const userData = userDoc.data();
    const chatList = userData?.chatList || [];

    return res.status(200).json({ chatPartners: chatList });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



const sendMessage = async (req, res) => {
  const { userId1, userId2, text } = req.body;

  if (!userId1 || !userId2 || !text) {
    return res.status(400).json({ error: "userId1, userId2, and text are required" });
  }

  try {
    // Create a consistent chat ID by sorting user IDs
    const sortedUsers = [userId1, userId2].sort();
    const chatId = `${sortedUsers[0]}-${sortedUsers[1]}`;

    // Reference to the "messages" subcollection under "chats/chatId"
    const messagesRef = admin.firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages");

    // Add message document
    await messagesRef.add({
      senderId: userId1,
      text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const loadChatMessages = async (req, res) => {
  const { userId, friendId } = req.params;

  if (!userId || !friendId) {
    return res.status(400).json({ error: "userId and friendId are required" });
  }

  try {
    // Create a consistent chat ID (sorted to ensure uniqueness)
    const sortedIds = [userId, friendId].sort();
    const chatId = `${sortedIds[0]}-${sortedIds[1]}`;

    // Reference to the messages subcollection
    const messagesRef = db.collection("chats").doc(chatId).collection("messages");
    const snapshot = await messagesRef.orderBy("timestamp", "asc").get();

    if (snapshot.empty) {
      return res.status(200).json({ messages: [] });
    }

    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export {loginFun,userPortfolio,adminLogin ,verifyLogin,createSession,registerFun ,addJob,addProject,getAllProjects,getAllJobs,getUserDetails,addUserToChatList,sendMessage,getChatPartners,loadChatMessages};

