import { async } from "regenerator-runtime";
import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  if(req.session.usrId == null){
    return res.render("home", { pageTitle: "Home" });
  } else {
    const usrId = req.session.usrId;
    const playList = await User.find({id: usrId}, {_id:0, tracks:1});
    const songList = await Song.find({}, {_id : 0}).sort({"views":-1});

    return res.render("list", { pageTitle: "list", songList, usrId, playList});
  }
  
};

export const songList = async (req, res) => {
  const songList = await Song.find({}, {_id : 0}).sort({"views":-1});
  console.log(songList);
  return res.render("list", { pageTitle: "list", songList});
};

export const login = async (req, res) => {
  const usrId = req.body.usrId;
  req.session.usrId = usrId;
  const playList = await User.find({id: usrId}, {_id:0, tracks:1});
  const songList = await Song.find({}, {_id : 0}).sort({"views":-1});

  console.log(songList);

  return res.render("list", { pageTitle: "list", songList, usrId, playList});
};

export const save = async (req, res) => {
  const usrId = req.body.usrId;
  const tracks = req.body.tracks;
  console.log(req.body);

  const user = new User({
    id: usrId,
    tracks: tracks
  });

  console.log(user);

  const usrInfo = await User.find({id: usrId});
  console.log(usrInfo);
  if(usrInfo != null){
    await User.deleteMany({id: usrId});
  }

  user.save();

  res.status(200);
  res.send({msg: "Your PlayList is saved"});

}