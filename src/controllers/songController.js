import { async } from "regenerator-runtime";
import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const songList = async (req, res) => {
  const songList = await Song.find({}, {_id : 0}).sort({"views":-1});
  console.log(songList);
  return res.render("list", { pageTitle: "list", songList});
};

export const login = async (req, res) => {
  const usrId = req.body.usrId;
  const playList = await User.find({id: usrId}, {_id:0, tracks:1});
  const songList = await Song.find({}, {_id : 0}).sort({"views":-1});

  console.log(songList);
  console.log(playList[0]);

  return res.render("list", { pageTitle: "list", songList, usrId, playList});
};

export const save = async (req, res) => {
  const usrId = req.body.id;
  const tracks = req.body.tracks;
  
  const user = new User({
    id: usrId,
    tracks: tracks
  });

  console.log(user);

  user.save();

  console.log(tracks);

  return res;

}