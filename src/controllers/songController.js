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

