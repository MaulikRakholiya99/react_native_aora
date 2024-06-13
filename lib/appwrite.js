import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from 'react-native-appwrite';
export const appWriteConfig = {
  endPoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.maulik.aora',
  projectId: '66682a8a00279d2eeca2',
  databaseId: '66682cdf0014c59ca8f4',
  userCollectionId: '66682d060036e74dbecc',
  videoCollectionId: '66682d1b0031a3f517c9',
  storageId: '66682f260021793e62db',
};
const {
  endPoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appWriteConfig;
// Init your React Native SDK
export const client = new Client();

client
  .setEndpoint(appWriteConfig.endPoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId) // Your project ID
  .setPlatform(appWriteConfig.platform); // Your application ID or bundle ID.
const avatar = new Avatars(client);
const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
export const createUser = async ({ email, password, userName }) => {
  try {
    const res = await account.create(ID.unique(), email, password, userName);
    if (!res) {
      throw new Error('Error creating user');
    }
    const avatarUrl = avatar.getInitials(userName);
    signIn({ email, password });
    const newUser = await database.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: res.$id,
        email,
        userName,
        avatar: avatarUrl,
      }
    );
    if (!newUser) {
      throw new Error('Error creating user');
    }
    return newUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const signIn = async ({ email, password }) => {
  try {
    const res = await account.createEmailPasswordSession(email, password);
    const currentUser = await database.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('email', res.providerUid)]
    );

    if (!res) {
      throw new Error('Error creating session');
    }
    if (!currentUser) {
      throw new Error('Error getting user');
    }
    return currentUser.documents[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getCurrantUser = async () => {
  try {
    const res = await account.get();
    if (!res) {
      throw new Error('Error getting user');
    }
    const currentUser = await database.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', res.$id)]
    );
    if (!currentUser) {
      throw new Error('Error getting current user');
    }
    return currentUser.documents[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPost = async () => {
  try {
    const post = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt')]
    );
    if (!post) {
      throw new Error('Error getting post');
    }
    return post.documents;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getLatestPost = async () => {
  try {
    const post = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    );
    if (!post) {
      throw new Error('Error getting post');
    }
    return post.documents;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const searchPost = async (query) => {
  try {
    const post = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.search('title', query)]
    );
    if (!post) {
      throw new Error('Error getting post');
    }
    return post.documents;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getUserPost = async (userId) => {
  try {
    const post = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.orderDesc('$createdAt'), Query.equal('users', userId)]
    );
    if (!post) {
      throw new Error('Error getting post');
    }
    return post.documents;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const signOut = async () => {
  try {
    const res = await account.deleteSession('current');
    if (!res) {
      throw new Error('Error signing out');
    }
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getFilePreview = (id, type) => {
  let fileUrl;
  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(storageId, id);
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(storageId, id, 1000, 1000, 'top', 100);
      console.log('fileUrl :', fileUrl);
    } else {
      throw new Error('Invalid file type');
    }
    if (!fileUrl) {
      throw new Error('Error getting file preview');
    }
    return fileUrl;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const uploadFile = async (file, type) => {
  try {
    if (!file) {
      throw new Error('No file found');
    }
    const { mimeType, ...rest } = file;
    const asset = {
      type: mimeType,
      ...rest,
    };
    const uploadFile = await storage.createFile(storageId, ID.unique(), asset);
    console.log('uploadFile :', uploadFile);
    const fileUrl = getFilePreview(uploadFile.$id, type);
    if (!uploadFile) {
      throw new Error('Error uploading file');
    }
    return fileUrl;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const createPost = async ({
  title,
  video,
  thumbnail,
  prompts,
  userId,
}) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(thumbnail, 'image'),
      uploadFile(video, 'video'),
    ]);
    const res = await database.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      ID.unique(),
      {
        title,
        video: videoUrl,
        thumbnail: thumbnailUrl,
        prompt: prompts,
        users: userId,
      }
    );
    if (!res) {
      throw new Error('Error creating post');
    }
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const likePost = async ({ $id, likes, currentUserId, like }) => {
  console.log('currentUserId :', currentUserId);
  console.log('$id :', $id);
  const newLikes = [...likes];
  if (like) {
    newLikes.push(currentUserId);
  } else {
    const index = newLikes.indexOf(currentUserId);
    newLikes.splice(index, 1);
  }
  try {
    const res = await database.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      $id,
      {
        likes: newLikes,
      }
    );
    if (!res) {
      throw new Error('Error liking post');
    }
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getLikedPost = async (userId) => {
  try {
    const post = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId
    );
    if (!post) {
      throw new Error('Error getting post');
    }
    return post.documents.filter((p) =>
      p.likes.find((l) => l.$id === userId)
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};
