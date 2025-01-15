import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';

// Define the structure of a post item
interface Post {
  id: string;
  title: string;
  body: string;
}

// Mock fetch function to simulate data fetching
const fetchPosts = async () => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', title: 'First Post', body: 'This is the body of the first post.' },
        { id: '2', title: 'Second Post', body: 'This is the body of the second post.' },
        { id: '3', title: 'Third Post', body: 'This is the body of the third post.' },
        // Add more posts as needed
      ]);
    }, 3000); // 3-second delay
  });
};

const ActivityIndicatorExample = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const getPosts = async () => {
      try {
        const fetchedPosts = (await fetchPosts()) as Post[];
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <View>
          {posts.map((post, index) => (
            <Text key={index}>{post.title}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default ActivityIndicatorExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  item: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  postBody: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  separator: {
    height: 10,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
