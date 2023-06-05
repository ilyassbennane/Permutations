import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';

const App = () => {
  const [professeurs, setProfesseurs] = useState([]);
  const [filteredProfesseurs, setFilteredProfesseurs] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [villeActuelles, setVilleActuelles] = useState([]);
  const [villeDesirees, setVilleDesirees] = useState([]);
  const [filters, setFilters] = useState({
    specialite: '',
    villeActuelle: '',
    villeDesiree: '',
  });
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
      const data = await response.json();
      setProfesseurs(data);
      setFilteredProfesseurs(data);
      const uniqueSpecialites = Array.from(new Set(data.map((professeur) => professeur.specialite)));
      setSpecialites(uniqueSpecialites);
      const uniqueVilleActuelles = Array.from(new Set(data.map((professeur) => professeur.villeFaculteActuelle)));
      setVilleActuelles(uniqueVilleActuelles);
      const uniqueVilleDesirees = Array.from(new Set(data.flatMap((professeur) => professeur.villeDesiree.split(';'))));
      setVilleDesirees(uniqueVilleDesirees);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    filterProfesseurs(newFilters);
  };

  const filterProfesseurs = (filters) => {
    const { specialite, villeActuelle, villeDesiree } = filters;
    const filtered = professeurs.filter((professeur) => {
      if (specialite && specialite !== professeur.specialite) {
        return false;
      }
      if (villeActuelle && villeActuelle !== professeur.villeFaculteActuelle) {
        return false;
      }
      if (villeDesiree && !professeur.villeDesiree.includes(villeDesiree)) {
        return false;
      }
      return true;
    });
    setFilteredProfesseurs(filtered);
  };

  const openPopup = (popupOptions) => {
    setPopup(popupOptions);
  };

  const closePopup = () => {
    setPopup(null);
  };

  
const renderPopup = () => {
  if (!popup) {
    return null;
  }

  const { label, items, filterName } = popup;

  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.popup}>
        <Text style={styles.popupLabel}>{label}</Text>
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => {
                handleFilterChange(filterName, item.value);
                closePopup();
              }}
            >
              <Text style={styles.popupItemText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={closePopup} style={styles.popupCloseButton}>
          <Text style={styles.popupCloseButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Professeurs:</Text>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Spécialité:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() =>
            openPopup({
              label: 'Spécialité',
              items: [
                { label: 'Toutes', value: '' },
                ...specialites.map((specialite) => ({ label: specialite, value: specialite })),
              ],
              filterName: 'specialite',
            })
          }
        >
          <Text style={styles.dropdownText}>{filters.specialite || 'Toutes'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Ville Actuelle:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() =>
            openPopup({
              label: 'Ville Actuelle',
              items: [
                { label: 'Toutes', value: '' },
                ...villeActuelles.map((ville) => ({ label: ville, value: ville })),
              ],
              filterName: 'villeActuelle',
            })
          }
        >
          <Text style={styles.dropdownText}>{filters.villeActuelle || 'Toutes'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Ville Désirée:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() =>
            openPopup({
              label: 'Ville Désirée',
              items: [
                { label: 'Toutes', value: '' },
                ...villeDesirees.map((ville) => ({ label: ville, value: ville })),
              ],
              filterName: 'villeDesiree',
            })
          }
        >
          <Text style={styles.dropdownText}>{filters.villeDesiree || 'Toutes'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredProfesseurs}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View style={styles.professeurContainer}>
            <Text style={styles.professeurText}>{`${item.nom} ${item.prenom}`}</Text>
            <Text style={styles.professeurText}>{`(${item.email} | ${item.tel} | ${item.grade})`}</Text>
            <Text style={styles.professeurText}>{`${item.specialite}`}</Text>
            <Text style={styles.professeurText}>{`(${item.faculteActuelle} | ${item.villeFaculteActuelle})`}</Text>
            <Text style={styles.professeurText}>{`---> ${item.villeDesiree}`}</Text>
            <Text style={styles.divider}>-------------------------------------------------------</Text>
          </View>
        )}
        style={styles.listContainer}
      />
      {renderPopup()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dropdownContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dropdownLabel: {
    marginRight: 8,
    fontSize: 16,
  },
  dropdown: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  dropdownText: {
    fontSize: 16,
    textAlign: 'left',
  },
  listContainer: {
    flexGrow: 1,
  },
  professeurContainer: {
    marginBottom: 8,
  },
  professeurText: {
    fontSize: 16,
  },
  divider: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 4,
  },
  popup: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  popupItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  popupItemText: {
    fontSize: 16,
  },
  popupCloseButton: {
    marginTop: 16,
  },
  popupCloseButtonText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20, // Adjust the value as needed
  },
});

export default App;
