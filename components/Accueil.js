import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const Accueil = () => {
  const [numProfesseurs, setNumProfesseurs] = useState(0);
  const [professeursParSpecialite, setProfesseursParSpecialite] = useState([]);
  const [professeursParVille, setProfesseursParVille] = useState([]);
  const [professeursParGrade, setProfesseursParGrade] = useState([]);
  const [hiddenLegends, setHiddenLegends] = useState([]);

  useEffect(() => {
    fetchProfesseurs();
  }, []);

  const fetchProfesseurs = async () => {
    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs');
      const data = await response.json();
      setNumProfesseurs(data.length);

      // Calculate number of professors per specialty
      const specialties = {};
      data.forEach((professeur) => {
        const { specialite } = professeur;
        if (specialite in specialties) {
          specialties[specialite] += 1;
        } else {
          specialties[specialite] = 1;
        }
      });

      // Convert object into an array of { specialite, count } objects
      const specialitesArray = Object.keys(specialties).map((specialite) => ({
        specialite,
        count: specialties[specialite],
      }));

      setProfesseursParSpecialite(specialitesArray);

      // Calculate number of professors per city
      const cities = {};
      data.forEach((professeur) => {
        const { villeDesiree } = professeur;
        const villeArray = villeDesiree.split(';'); // Split the string into an array of cities
        villeArray.forEach((ville) => {
          if (ville in cities) {
            cities[ville] += 1;
          } else {
            cities[ville] = 1;
          }
        });
      });

      // Convert object into an array of { ville, count } objects
      const citiesArray = Object.keys(cities).map((ville) => ({
        ville,
        count: cities[ville],
      }));

      setProfesseursParVille(citiesArray);

      // Calculate number of professors per grade
      const grades = {};
      data.forEach((professeur) => {
        const { grade } = professeur;
        if (grade in grades) {
          grades[grade] += 1;
        } else {
          grades[grade] = 1;
        }
      });

      // Convert object into an array of { grade, count } objects
      const gradesArray = Object.keys(grades).map((grade) => ({
        grade,
        count: grades[grade],
      }));

      setProfesseursParGrade(gradesArray);
    } catch (error) {
      console.log('Error fetching professeurs:', error);
    }
  };

  const generateColor = (key) => {
    const colors = [
      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    ];

    const index = key.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  const specialtyChartData = professeursParSpecialite.map((item) => ({
    name: item.specialite,
    population: item.count,
    color: generateColor(item.specialite),
  }));

  const cityChartData = professeursParVille.map((item) => ({
    name: item.ville,
    population: item.count,
    color: generateColor(item.ville),
  }));

  const gradeChartData = professeursParGrade.map((item) => ({
    name: item.grade,
    population: item.count,
    color: generateColor(item.grade),
  }));

  const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    legendFontColor: 'red', // Custom text color
    legendFontSize: 12, // Adjust the font size as needed
  };

  const renderListItem = ({ item }) => {
    if (item.type === 'description') {
      return <Text style={styles.description}>{item.text}</Text>;
    } else if (item.type === 'chart') {
      const filteredChartData = item.chartData.filter(
        (dataPoint) => !hiddenLegends.includes(dataPoint.name)
      );
      return (
        <>
          {filteredChartData.length > 0 ? (
            <TouchableOpacity
              onPress={() => handleLegendPress(item.chartData)}
              activeOpacity={0.8}
            >
              <PieChart
                data={filteredChartData}
                width={300}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft={15}
                absolute
                style={styles.pieChart}
                hasLegend={false}
              />
            </TouchableOpacity>
          ) : null}
        </>
      );
    } else if (item.type === 'legend') {
      const isHidden = hiddenLegends.includes(item.name);
      return (
        <TouchableOpacity
          onPress={() => handleLegendPress(item.name)}
          style={styles.legendItem}
        >
          <View
            style={[
              styles.legendColor,
              { backgroundColor: item.color, opacity: isHidden ? 0.5 : 1 },
            ]}
          />
          <Text
            style={[
              styles.legendText,
              { textDecorationLine: isHidden ? 'line-through' : 'none' },
            ]}
          >
            {`${item.name} (${item.population})`}
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const handleLegendPress = (legendName) => {
    setHiddenLegends((prevHiddenLegends) => {
      const isLegendHidden = prevHiddenLegends.includes(legendName);
      if (isLegendHidden) {
        return prevHiddenLegends.filter((legend) => legend !== legendName);
      } else {
        return [...prevHiddenLegends, legendName];
      }
    });
  };

  const getItemLayout = (data, index) => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      const item = data[i];
      if (item.type === 'description') {
        offset += 20; // Adjust the offset as needed
      } else if (item.type === 'chart') {
        offset += 220; // Adjust the offset as needed
      } else if (item.type === 'legend') {
        offset += 24; // Adjust the offset as needed
      }
    }
    return { length: offset, offset, index };
  };

  const viewComponents = [
    { type: 'description', text: `Nombre de profs inscrits: ${numProfesseurs}` },
    { type: 'description', text: 'Nombre de profs par spécialité:' },
    { type: 'chart', chartData: specialtyChartData },
    ...specialtyChartData.map((dataPoint) => ({ type: 'legend', ...dataPoint })),
    { type: 'description', text: 'Villes les plus demandées:' },
    { type: 'chart', chartData: cityChartData },
    ...cityChartData.map((dataPoint) => ({ type: 'legend', ...dataPoint })),
    { type: 'description', text: 'Nombre de profs par grade:' },
    { type: 'chart', chartData: gradeChartData },
    ...gradeChartData.map((dataPoint) => ({ type: 'legend', ...dataPoint })),
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={viewComponents}
        renderItem={renderListItem}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.flatListContainer}
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
  flatListContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
 description: {
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 10,
},

  pieChart: {
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
  },
});

export default Accueil;