import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Apropos = () => {
  const data = [
    {
      id: '1',
      text: 'Plateforme de Permutation pour Enseignants Universitaires',
    },
    {
      id: '2',
      text:
        'Cette plateforme est simplement un espace permettant aux professeurs universitaires de rechercher un partenaire pour une permutation. Elle se limite à cette fonctionnalité. Les enseignants peuvent rechercher des partenaires intéressés par un échange dans d\'autres établissements d\'enseignement supérieur. Le système facilite la recherche et la correspondance entre les enseignants ayant une volonté mutuelle d\'échanger.',
    },
    {
      id: '3',
      text:
        'La plateforme offre une interface conviviale et sécurisée aux enseignants pour communiquer et échanger les informations nécessaires. Les membres peuvent créer des profils personnels et renseigner des informations concernant leurs spécialités, les établissements et les informations de contact. Les enseignants peuvent consulter les profils des partenaires potentiels et entrer en contact avec eux pour discuter des détails de l\'accord d\'échange.',
    },
    {
      id: '4',
      text:
        'En utilisant cette plateforme, les enseignants peuvent faciliter leur recherche de partenaires d\'échange, économiser du temps et des efforts en évitant les communications individuelles et les recherches continues d\'opportunités d\'échange. Ce système est efficace et utile pour les enseignants souhaitant changer d\'institution ou travailler dans un nouvel établissement pour élargir leur expérience académique.',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <Text style={styles.description}>
        {item.text}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={() => (
          <Text style={styles.title}>
            {data[0].text}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  flatListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
});

export default Apropos;
