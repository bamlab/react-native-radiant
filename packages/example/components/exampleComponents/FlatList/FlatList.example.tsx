import { FlatList, StyleSheet, Text, View } from 'react-native';

const DATA = [
  {
    id: '1',
    name: 'John Doe',
    phone: '123-456-7890',
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '987-654-3210',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    phone: '555-123-4567',
  },
  {
    id: '4',
    name: 'Bob Brown',
    phone: '444-555-6666',
  },
  {
    id: '5',
    name: 'Emma Wilson',
    phone: '111-222-3333',
  },
  {
    id: '6',
    name: 'Liam Davis',
    phone: '222-333-4444',
  },
  {
    id: '7',
    name: 'Olivia Martinez',
    phone: '333-444-5555',
  },
  {
    id: '8',
    name: 'Noah Garcia',
    phone: '444-555-6666',
  },
  {
    id: '9',
    name: 'Ava Rodriguez',
    phone: '555-666-7777',
  },
  {
    id: '10',
    name: 'Isabella Hernandez',
    phone: '666-777-8888',
  },
  {
    id: '11',
    name: 'Sophia Lopez',
    phone: '777-888-9999',
  },
  {
    id: '12',
    name: 'Mason Gonzalez',
    phone: '888-999-0000',
  },
  {
    id: '13',
    name: 'Mia Perez',
    phone: '999-000-1111',
  },
  {
    id: '14',
    name: 'Lucas Taylor',
    phone: '000-111-2222',
  },
  {
    id: '15',
    name: 'Charlotte Thomas',
    phone: '111-222-3333',
  },
  {
    id: '16',
    name: 'Amelia Moore',
    phone: '222-333-4444',
  },
];

interface ItemProps {
  name: string;
  phone: string;
}

const Item = ({ name, phone }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.phone}>{phone}</Text>
  </View>
);

const FlatListExample = () => {
  const renderItem = ({ item }: { item: ItemProps }) => (
    <Item name={item.name} phone={item.phone} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  phone: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  separator: {
    height: 10,
  },
});

export default FlatListExample;
