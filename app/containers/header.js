import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';


const getColumns = (selectedDate) => {
  const columns = [];
  for (let i = 0; i < 7; i++) {
    let date = moment(selectedDate);
    date = date.add(i, 'd');
    columns.push(date);
    console.log('HEADERDATE' + date.toString());
  }
  return columns;
};


const Column = ({
    column, format,
  }) => {
    return (
      <View style={styles.headerColumn}>
        <Text style={[styles.headerText, 12]}>
          {moment(column).format("ddd" + "[\n]" +"D")}
        </Text>
      </View>
    );
  };

  

const Columns = ({ columns, format }) => {
  return (
    <View style={styles.headerColumns}>
      {columns.map((column) => {
        return (
          <Column
            key={column}
            column={column}
            format={format}
          />
        );
      })}
    </View>
  );
};

const Title = ({ selectedDate }) => { // eslint-disable-line react/prop-types
  return (
    <View style={styles.headerTitle}>
      <Text
        style={[styles.headerText, { fontSize: 12 }]}
      >
        {moment(selectedDate).format('MMM Y')}
      </Text>
    </View>
  );
};

const WeekViewHeader = ({
  selectedDate, formatDate, style,
}) => {
  const getCol = getColumns(selectedDate);
  return (
    <View style={[styles.headerContainer, style]}>
      <Title selectedDate={selectedDate} />
      {getCol && <Columns format={formatDate} columns={getCol} />}
    </View>
  );
};

WeekViewHeader.propTypes = {
  selectedDate: PropTypes.instanceOf(moment).isRequired,
  formatDate: PropTypes.string,
  style: PropTypes.object,
};

WeekViewHeader.defaultProps = {
  formatDate: "ddd[\n]" +"D"
};



const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
    },
    headerTitle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      fontFamily: "Raleway-Regular",
    },
    headerColumns: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    headerColumn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#fff',
      borderTopWidth: 1,
      borderLeftWidth: 1,
    },
    headerText: {
      color: '#fff',
      textAlign:"center",
      justifyContent:"center"
    },
  });


export default WeekViewHeader;