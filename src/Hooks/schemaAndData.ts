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
    lyrics: string;
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
      lyrics: `[00:00.00]
[00:19.14] Your morning eyes, I could stare like watching stars
[00:26.34] I could walk you by, and I'll tell without a thought
[00:32.90] You'd be mine
[00:34.99] Would you mind if i took your hand tonight
[00:40.36] Know you're all that I want this life
[00:48.15] I'll imagine we fell in love
[00:50.72] I'll nap under moonlight skies with you
[00:54.64] I think I'll picture us, you with the waves
[00:58.27] The oceans colors on your face
[01:02.16] I'll leave my heart with your air
[01:06.26] So let me fly with you
[01:09.51] Will you be forever with me
[01:17.35] 
[01:46.86] My love will always stay by you
[01:52.50] I'll keep it safe so don't you worry a thing, I'll tell you i love you more
[02:01.40] It's stuck with you forever so promise you won't let it go
[02:08.17] I'll trust the universe will always bring me to you
[02:16.69] I'll imagine we fell in love
[02:19.27] I'll nap under moonlight skies with you
[02:23.12] I think I'll picture us, you with the waves
[02:26.73] The oceans colors on your face
[02:30.37] I'll leave my heart with your air
[02:34.76] So let me fly with you
[02:38.14] Will you be forever with me
[02:46.16] ...`,
    },
    {
      name: "There Is a Light That Never Goes Out (Take 1)",
      artist: "The Smiths",
      image: "/MusicImages/There-Is-a-Light-That-Never-Goes-Out-Take-1.jpg",
      song: "https://aac.saavncdn.com/674/4d6a5af824e2688525d94fd9f3a134d1_48.mp4",
      fav: false,
      lyrics: `[00:00.00]
[00:04.35] Take me out tonight
[00:10.46] Where there's music and there's people
[00:12.22] And they're young and alive
[00:17.42] Driving in your car
[00:21.13] I never, never want to go home
[00:23.91] Because I haven't got one anymore
[00:32.77] Take me out tonight
[00:38.52] Because I want to see people
[00:40.63] And I want to see lights
[00:46.03] Driving in your car
[00:49.18] Oh, please don't drop me home
[00:52.15] Because it's not my home, it's their home
[00:54.60] And I'm welcome no more
[00:57.57] 
[01:03.14] And if a double-decker bus
[01:07.29] Crashes into us
[01:11.27] To die by your side
[01:13.78] Is such a heavenly way to die
[01:17.18] And if a ten ton truck
[01:21.50] Kills the both of us
[01:25.53] To die by your side
[01:27.97] Well, the pleasure and the privilege is mine
[01:33.06] Take me out tonight
[01:38.16] Take me anywhere
[01:39.71] I don't care, I don't care, I don't care
[01:45.64] And in the darkened underpass
[01:48.32] I though, "Oh God, my chance has come at last"
[01:52.87] But then a strange fear gripped me
[01:54.71] And I just couldn't ask
[02:01.15] Take me out tonight
[02:06.88] Because I want to see people
[02:08.83] And I want to see lights
[02:14.30] Driving in your car
[02:17.25] I never, never want to go home
[02:20.47] Because I haven't got one, no, no, no
[02:24.32] I haven't got one
[02:27.11] 
[02:31.38] And if a double-decker bus
[02:35.37] Crashes into us
[02:39.39] To die by your side
[02:41.92] Is such a heavenly way to die
[02:45.40] And if a ten ton truck
[02:49.52] Kills the both of us
[02:53.59] To die by your side
[02:56.16] All the pleasure, the privilege is mine
[03:00.42] There is a light that never goes out
[03:03.83] There is a light that never goes out
[03:07.25] There is a light that never goes out
[03:10.90] There is a light that never goes out
[03:14.11] There is a light in your eyes that never goes out
[03:17.34] There is a light in your eyes that never goes out
[03:20.90] There is a light in your eyes that never goes out
[03:24.54] There is a light, there is a light, there is a light
[03:31.32] There is a light
[03:33.77] ...`,
    },
    {
      name: "Co2",
      artist: "Prateek Kuhad",
      image: "/MusicImages/Co2.jpg",
      song: "https://aac.saavncdn.com/943/f272b2becf5eb598852a97f9d2cd8ba7_48.mp4",
      fav: false,
      lyrics: `[00:00.00]
[00:01.04] Maybe I was wrong and you were right
[00:03.64] But I don't really wanna have this fight
[00:06.91] I just wanna feel like I belong
[00:12.56] And every time my heart swings back to you
[00:15.68] You are my morning and my truth
[00:18.36] And all that I can do is sing this song
[00:22.89] It ain't that long, mm
[00:27.27] And nothing says "I love you" like your eyes
[00:29.85] Fill my lips with carbon dioxide
[00:33.48] I just wanna feel like I deserve you
[00:36.94] 'Cause you deserve me
[00:39.52] Baby, it's the way that you can see
[00:42.02] What I miss and what I can never be
[00:45.48] I just wanna feel like I deserve you
[00:48.67] 'Cause you deserve me
[00:51.04] Maybe you were wrong and I was right
[00:53.96] I don't care, won't you stay another night?
[00:57.15] I just need some time to be myself
[01:03.04] I couldn't say "I need you" on that night
[01:05.60] When you left and I lost all track of time
[01:08.86] I just want you close so I can feel you
[01:13.41] Can you feel me? Mmm
[01:17.67] And nothing says "I love you" like the words
[01:20.84] That were never said, but could be heard
[01:23.68] If only there was peace around us, baby
[01:27.51] You would hear me
[01:29.54] And maybe it's the way that lovers do
[01:32.32] I just want for me what I want for you
[01:35.61] Only with the sun above us maybe
[01:39.36] You would see me
[01:43.64] 
[01:56.46] And even if you leave, I may be fine
[01:58.95] 'Cause my heart, it has its own design
[02:02.21] And even if you never see it, baby
[02:05.77] You're all that I need
[02:08.33] Maybe it's the silence in your eyes
[02:11.29] Maybe it's the lilac when you're shy
[02:14.03] Maybe it's the mystery of your love
[02:16.72] All I need is a sign from the stars above
[02:20.18] Maybe it's the way that you breathe in me
[02:23.09] Maybe it's the man that you see in me
[02:26.00] Maybe it's the fragrance of your hair
[02:28.81] Yeah, I just wanna kiss you when you're there
[02:31.93] I just want you all around me, baby
[02:35.32] Can we make that happen, please?
[02:38.59] ...`,
    },
    {
      name: "Line Without a Hook",
      artist: "Ricky Montgomery",
      image: "/MusicImages/Line-Without-a-Hook.jpg",
      song: "https://aac.saavncdn.com/357/0ade6424e971b8149374ba7af771f3bd_48.mp4",
      fav: false,
      lyrics: `[00:00.00]
[00:00.64] I don't really give a damn about the way you touch me when we're alone
[00:05.70] You can hold my hand if no one's home
[00:09.40] Do you like it when I'm away?
[00:12.91] If I went and hurt my body, baby would you love me the same?
[00:16.12] I can feel all my bones coming back, and I'm craving motion
[00:21.53] Mama never really learned how to live by herself
[00:24.69] It's a curse
[00:26.58] And it's growing
[00:28.47] You're a pond and I'm an ocean, oh
[00:32.85] All my emotions
[00:36.50] Feel like explosions when you are around
[00:41.73] And I've found
[00:43.74] A way to kill the sound, oh
[00:47.26] Oh, baby, I am a wreck when I'm without you
[00:53.49] I need you here to stay
[00:56.18] I broke all my bones that day I found you
[01:01.00] Crying at the lake
[01:03.59] Was it something I said to make you feel like you're a burden?
[01:09.86] Oh, and if I could take it all back
[01:13.24] I swear that I
[01:16.09] Would pull you from the tide
[01:20.85] 
[01:24.09] Oh, whoa, whoa, whoa!
[01:25.23] I said no (I said no)
[01:26.90] I said no (I said no)
[01:29.06] Listen close, it's a no
[01:33.19] The wind is a-poundin' on my back
[01:36.77] And I've found hope in a heart attack
[01:40.59] Oh, at last
[01:42.34] It has passed
[01:44.10] Now I've got it, and you can't have it
[01:48.61] Oh, baby, I am a wreck when I'm without you
[01:53.99] I need you here to stay
[01:56.81] I broke all my bones that day I found you
[02:01.72] Crying at the lake
[02:04.10] Was it something I said to make you feel like you're a burden?
[02:10.43] Oh, and if I could take it all back
[02:13.85] I swear that I
[02:16.60] Would pull you from the tide
[02:26.52] Darling, when I'm fast asleep
[02:29.82] I've seen this person watching me
[02:33.36] Saying, "Is it worth it? Is it worth it?
[02:37.82] Tell me, is it worth it?"
[02:48.36] Oh
[02:55.90] 'Cause there is something and there is nothing
[02:59.69] There is nothing in between
[03:03.15] And in my eyes, there is a tiny dancer
[03:08.58] Watching over me
[03:10.79] He's singing, "She's a, she's a lady
[03:15.55] And I am just a boy"
[03:18.24] He's singing, "She's a, she's a lady
[03:23.14] And I am just a line without a-"
[03:27.14] Oh, baby, I am a wreck when I'm without you
[03:32.44] I need you here to stay
[03:35.78] Broke all my bones that day I found you
[03:40.24] Crying at the lake
[03:43.01] Oh, was it something I said to make you feel like you're a burden?
[03:49.07] Oh, and if I could take it all back
[03:52.32] I swear that I
[03:55.22] Would pull you from the tide
[03:58.04] ... `,
    },
    {
      name: "Somewhere Only We Know (Remastered 2024)",
      artist: "Keane",
      image: "/MusicImages/Somewhere-Only-We-Know.jpg",
      song: "https://aac.saavncdn.com/456/429724cdb98ee742ab8b7a334ff626be_48.mp4",
      fav: false,
      lyrics: `[00:00.00]
[00:23.67] I walked across an empty land
[00:28.66] I knew the pathway like the back of my hand
[00:34.36] I felt the earth beneath my feet
[00:40.12] Sat by the river and it made me complete
[00:45.37] Oh, simple thing, where have you gone?
[00:51.03] I'm getting old, and I need something to rely on
[00:56.80] So, tell me when you're gonna let me in
[01:02.23] I'm getting tired, and I need somewhere to begin
[01:07.73] I came across a fallen tree
[01:13.48] I felt the branches of it looking at me
[01:18.99] Is this the place we used to love?
[01:24.60] Is this the place that I've been dreaming of?
[01:30.11] Oh, simple thing, where have you gone?
[01:35.52] I'm getting old, and I need something to rely on
[01:41.22] So, tell me when you're gonna let me in
[01:46.91] I'm getting tired, and I need somewhere to begin
[01:53.30] And if you have a minute, why don't we go
[01:58.66] Talk about it somewhere only we know?
[02:04.36] This could be the end of everything
[02:09.05] So, why don't we go somewhere only we know?
[02:17.32] Somewhere only we know
[02:25.97] Oh, simple thing, where have you gone?
[02:31.32] I'm getting old, and I need something to rely on
[02:37.12] So, tell me when you're gonna let me in
[02:42.54] I'm getting tired, and I need somewhere to begin
[02:49.04] And if you have a minute, why don't we go
[02:54.31] Talk about it somewhere only we know?
[02:59.76] This could be the end of everything
[03:04.79] So, why don't we go?
[03:07.33] So, why don't we go?
[03:13.06] Ooh, oh-oh
[03:18.05] Ah, oh
[03:22.49] This could be the end of everything
[03:27.12] So, why don't we go somewhere only we know?
[03:35.46] Somewhere only we know
[03:40.98] Somewhere only we know
[03:48.46] ...`,
    },
  ],
};

export default ctxSchema;
