import { Router } from "express";
import { logout } from "../../Controller/user.controller";
import { createPost, getFeeds, getOwnerFeed, deletePost, getPresignedUrl, togglePostPrivacy} from "../../Controller/feed.controller";
const router = Router();

router.post("/post", createPost);
router.get("/feeds", getFeeds);
router.get("/owner/feeds", getOwnerFeed);
router.post("/post/delete", deletePost);
router.post("/presignedurl", getPresignedUrl);
router.post("/toggle/privacy", togglePostPrivacy);
router.post("/logout", logout);

export { 
	router
}

