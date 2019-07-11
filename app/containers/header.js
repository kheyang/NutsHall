import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';

// import { getFormattedDate, getCurrentMonth } from '../utils';

// import styles from './Header.styles';

// const getFormattedDate = (date, format) => {
//     return moment(date).format(format);
//   };
  
//   const setLocale = (locale) => {
//     moment.locale(locale);
//   };
  
//   const addLocale = (locale, obj) => {
//     moment.locale(locale, obj);
//   };
  
//   const getCurrentMonth = (date) => {
//     return moment(date).format('MMM Y');
//   };

const getColumns = (numberOfDays, selectedDate) => {
  const columns = [];
//   let initial = 0;
//   if (numberOfDays === 7) {
//     initial = 1;
//     initial -= moment().isoWeekday();
//   }
//   for (let i = initial; i < (numberOfDays + initial); i += 1) {
//     let date = moment(selectedDate);
//     date = date.add(i, 'd');
//     columns.push(date.toDate());
//   }
  for (let i = 0; i < 7; i++) {
    let date = moment(selectedDate).startOf('week').isoWeekday(1);
    date = date.add(i, 'd');
    columns.push(date);
    console.log('HEADERDATE' + date.toString());
  }
  return columns;
};

// const getFontSizeHeader = (numberOfDays) => {
//   if (numberOfDays > 1) {
//     return 12;
//   }

//   return 16;
// };

// const getDayTextStyles = (numberOfDays) => {
//   const fontSize = numberOfDays === 7 ? 12 : 14;
//   return {
//     fontSize,
//   };
// };

// const Column = ({
//   column, numberOfDays, format,
// }) => {
//   return (
//     <View style={styles.column}>
//       <Text style={[styles.text, getDayTextStyles(numberOfDays)]}>
//         {getFormattedDate(column, format)}
//       </Text>
//     </View>
//   );
// };


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

  

const Columns = ({ columns, numberOfDays, format }) => {
  return (
    <View style={styles.headerColumns}>
      {columns.map((column) => {
        return (
          <Column
            key={column}
            column={column}
            numberOfDays={numberOfDays}
            format={format}
          />
        );
      })}
    </View>
  );
};

const Title = ({ numberOfDays, selectedDate }) => { // eslint-disable-line react/prop-types
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
  numberOfDays, selectedDate, formatDate, style,
}) => {
  const getCol = getColumns(numberOfDays, selectedDate);
  return (
    <View style={[styles.headerContainer, style]}>
      <Title numberOfDays={numberOfDays} selectedDate={selectedDate} />
      {getCol && <Columns format={formatDate} columns={getCol} numberOfDays={numberOfDays} />}
    </View>
  );
};

WeekViewHeader.propTypes = {
  numberOfDays: PropTypes.oneOf([1, 3, 7]).isRequired,
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
    },
  });


export default WeekViewHeader;