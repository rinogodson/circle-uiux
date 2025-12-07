const ctxSchema: {
  volume: number;
  repeat: boolean;
  currentSong: number;
  songs: {
    name: string;
    artist: string;
    image: string;
    song: string;
    fav: boolean;
  }[];
} = {
  volume: 90,
  repeat: false,
  currentSong: 0,
  songs: [
    {
      name: "blue",
      artist: "Yung Kai",
      image: "/MusicImages/blue.jpg",
      song: "https://aac.saavncdn.com/994/07d4d911d6f7b59bc817cfc2600bf70f_48.mp4",
      fav: false,
    },
    {
      name: "There Is a Light That Never Goes Out (Take 1)",
      artist: "The Smiths",
      image: "/MusicImages/There-Is-a-Light-That-Never-Goes-Out-Take-1.jpg",
      song: "https://aac.saavncdn.com/674/4d6a5af824e2688525d94fd9f3a134d1_48.mp4",
      fav: false,
    },
    {
      name: "Co2",
      artist: "Prateek Kuhad",
      image: "/MusicImages/Co2.jpg",
      song: "https://aac.saavncdn.com/943/f272b2becf5eb598852a97f9d2cd8ba7_48.mp4",
      fav: false,
    },
    {
      name: "Line Without a Hook",
      artist: "Ricky Montgomery",
      image: "/MusicImages/Line-Without-a-Hook.jpg",
      song: "https://aac.saavncdn.com/357/0ade6424e971b8149374ba7af771f3bd_48.mp4",
      fav: false,
    },
    {
      name: "Somewhere Only We Know (Remastered 2024)",
      artist: "Keane",
      image: "/MusicImages/Somewhere-Only-We-Know.jpg",
      song: "https://aac.saavncdn.com/456/429724cdb98ee742ab8b7a334ff626be_48.mp4",
      fav: false,
    },
  ],
};

export default ctxSchema;
