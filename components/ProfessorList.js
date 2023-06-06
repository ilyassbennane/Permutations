import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Svg, Circle, Line } from 'react-native-svg';

const ProfessorList = () => {
  const [professors, setProfessors] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);

  useEffect(() => {
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then((response) => response.json())
      .then((data) => setProfessors(data))
      .catch((error) => setError(error.message));
  }, []);

  const generateCombinations = () => {
    const combinations = [];

    for (let i = 0; i < professors.length; i++) {
      const professor1 = professors[i];

      for (let j = i + 1; j < professors.length; j++) {
        const professor2 = professors[j];

        const desiredCities1 = professor1.villeDesiree.split(';');
        const desiredCities2 = professor2.villeDesiree.split(';');

        const matchFound1 = desiredCities1.some((city) => city === professor2.villeFaculteActuelle);
        const matchFound2 = desiredCities2.some((city) => city === professor1.villeFaculteActuelle);

        if (professor1.specialite === professor2.specialite && matchFound1 && matchFound2) {
          const combination = {
            professor1: professor1,
            professor2: professor2,
          };

          // Check if the combination is already present in the combinations list
          const isDuplicate = combinations.some(
            (item) =>
              (item.professor1 === combination.professor1 && item.professor2 === combination.professor2) ||
              (item.professor1 === combination.professor2 && item.professor2 === combination.professor1)
          );

          if (!isDuplicate) {
            combinations.push(combination);
          }
        }
      }
    }

    return combinations;
  };

  const handleSpecialityFilter = (speciality) => {
    setSelectedSpeciality(speciality);
    setModalVisible(false);
  };

  const renderCombinationItem = ({ item }) => {
    return (
      <View style={styles.combinationItem}>
        <Text>
          {item.professor1.prenom} {item.professor1.nom} (Speciality: {item.professor1.specialite}) and
          {item.professor2.prenom} {item.professor2.nom} (Speciality: {item.professor2.specialite})
        </Text>
        {item.professor1.circlesFermees && item.professor1.circlesFermees.length > 0 && (
          <Text style={styles.closedCircles}>
            Closed circles: {item.professor1.circlesFermees.join(', ')}
          </Text>
        )}
        {item.professor2.circlesFermees && item.professor2.circlesFermees.length > 0 && (
          <Text style={styles.closedCircles}>
            Closed circles: {item.professor2.circlesFermees.join(', ')}
          </Text>
        )}
      </View>
    );
  };

  const filterBySpeciality = (speciality) => {
    if (speciality) {
      return generateCombinations().filter(
        (combination) =>
          combination.professor1.specialite === speciality || combination.professor2.specialite === speciality
      );
    }
    return generateCombinations();
  };

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const combinations = filterBySpeciality(selectedSpeciality);

  const chartData = combinations.map((combination) => ({
    professor1: combination.professor1,
    professor2: combination.professor2,
    value: 1,
  }));

  const maxPoints = Math.max(...chartData.map((data) => data.value));
  const chartHeight = 200;
  const chartWidth = Dimensions.get('window').width - 40;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.filterButton}>Filter by Speciality</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Speciality</Text>
          <FlatList
            data={Array.from(new Set(professors.map((professor) => professor.specialite)))}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSpecialityFilter(item)}>
                <Text style={styles.modalSpeciality}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => handleSpecialityFilter(null)}>
            <Text style={styles.modalSpeciality}>Show All</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={styles.combinationsTitle}>Combinations:</Text>
      <FlatList data={combinations} keyExtractor={(item, index) => index} renderItem={renderCombinationItem} />
      <Text style={styles.chartTitle}>Combination Chart:</Text>
  {    <Svg height={chartHeight} width={chartWidth}>
  {chartData.map((data, index) => {
    const points = chartData.map((data) => data.professor1.prenom + data.professor2.prenom);
    const pointIndex1 = points.indexOf(data.professor1.prenom + data.professor2.prenom);
    const pointIndex2 = points.indexOf(data.professor2.prenom + data.professor1.prenom);
    const pointSize = 5;
    const margin = 20;
    const pointSpacingX = (chartWidth - 2 * margin) / (chartData.length + 1);
    const pointSpacingY = (chartHeight - 2 * margin) / (chartData.length + 1);
    const x1 = margin + pointSpacingX * (pointIndex1 + 1);
    const y1 = margin + pointSpacingY * (pointIndex1 + 1);
    const x2 = margin + pointSpacingX * (pointIndex2 + 1);
    const y2 = margin + pointSpacingY * (pointIndex2 + 1);

    return (
      <React.Fragment key={index}>
        <Circle cx={x1} cy={y1} r={pointSize} fill="blue" />
        <Circle cx={x2} cy={y2} r={pointSize} fill="blue" />
        <Line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth={1} />
      </React.Fragment>
    );
  })}
</Svg>}
 </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  filterButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalSpeciality: {
    fontSize: 16,
    marginBottom: 10,
  },
  combinationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  combinationItem: {
    marginBottom: 10,
  },
  closedCircles: {
    color: 'red',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default ProfessorList;
