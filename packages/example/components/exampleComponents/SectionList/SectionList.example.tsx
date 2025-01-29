import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SectionListData,
  ListRenderItemInfo,
  SafeAreaView,
} from 'react-native';

// Define the structure of a contact item
interface Contact {
  id: string;
  name: string;
  phone: string;
}

// Define the structure of a section
interface SectionData {
  title: string;
  data: Contact[];
}

// Sample data for the SectionList
const DATA: SectionData[] = [
  {
    title: 'A',
    data: [
      { id: '1', name: 'Alice Anderson', phone: '555-123-4567' },
      { id: '2', name: 'Arnold Palmer', phone: '555-987-6543' },
    ],
  },
  {
    title: 'B',
    data: [
      { id: '3', name: 'Bob Brown', phone: '555-456-7890' },
      { id: '4', name: 'Barbara White', phone: '555-654-3210' },
    ],
  },
  {
    title: 'C',
    data: [
      { id: '5', name: 'Charlie Black', phone: '555-111-2222' },
      { id: '6', name: 'Catherine Green', phone: '555-333-4444' },
    ],
  },
  {
    title: 'D',
    data: [
      { id: '7', name: 'David Gray', phone: '555-777-8888' },
      { id: '8', name: 'Donna Smith', phone: '555-888-9999' },
    ],
  },
  {
    title: 'E',
    data: [
      { id: '9', name: 'Edward King', phone: '555-999-0000' },
      { id: '10', name: 'Ella Fitzgerald', phone: '555-000-1111' },
    ],
  },
  {
    title: 'F',
    data: [
      { id: '11', name: 'Frank Martin', phone: '555-112-1314' },
      { id: '12', name: 'Fiona Apple', phone: '555-151-6171' },
    ],
  },
  {
    title: 'G',
    data: [
      { id: '13', name: 'George Lucas', phone: '555-181-9202' },
      { id: '14', name: 'Grace Hopper', phone: '555-212-2232' },
    ],
  },
  {
    title: 'H',
    data: [
      { id: '15', name: 'Henry Ford', phone: '555-242-5262' },
      { id: '16', name: 'Hannah Montana', phone: '555-272-8292' },
    ],
  },
  {
    title: 'I',
    data: [
      { id: '17', name: 'Ian McKellen', phone: '555-303-1323' },
      { id: '18', name: 'Isla Fisher', phone: '555-343-5363' },
    ],
  },
  {
    title: 'J',
    data: [
      { id: '19', name: 'Jack Black', phone: '555-575-8393' },
      { id: '20', name: 'Jenna Coleman', phone: '555-909-1424' },
    ],
  },
  {
    title: 'K',
    data: [
      { id: '21', name: 'Kevin Hart', phone: '555-465-7484' },
      { id: '22', name: 'Kate Winslet', phone: '555-495-9505' },
    ],
  },
  {
    title: 'L',
    data: [
      { id: '23', name: 'Liam Neeson', phone: '555-515-2535' },
      { id: '24', name: 'Lucy Liu', phone: '555-555-6575' },
    ],
  },
  {
    title: 'M',
    data: [
      { id: '25', name: 'Michael Jordan', phone: '555-686-9595' },
      { id: '26', name: 'Mila Kunis', phone: '555-707-1616' },
    ],
  },
  {
    title: 'N',
    data: [
      { id: '27', name: 'Natalie Portman', phone: '555-727-1717' },
      { id: '28', name: 'Neil Patrick', phone: '555-747-1818' },
    ],
  },
  {
    title: 'O',
    data: [
      { id: '29', name: 'Oscar Wilde', phone: '555-767-1919' },
      { id: '30', name: 'Olivia Newton', phone: '555-787-2020' },
    ],
  },
];

// Item component to render each contact
const Item = ({ name, phone }: Contact) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.phone}>{phone}</Text>
  </View>
);

// Header component to render each section header
const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

export const SectionListExample = () => {
  // Function to render each item
  const renderItem = ({ item }: ListRenderItemInfo<Contact>) => (
    <Item id={item.id} name={item.name} phone={item.phone} />
  );

  // Function to render each section header
  const renderSectionHeader = ({ section: { title } }: { section: SectionListData<Contact> }) => (
    <SectionHeader title={title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <SectionList
        sections={DATA}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        stickySectionHeadersEnabled={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No contacts available.</Text>
          </View>
        }
        initialNumToRender={20}
      />
    </SafeAreaView>
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
  header: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  item: {
    padding: 15,
    backgroundColor: '#fafafa',
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
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
