import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text, Dimensions } from "react-native";
import moment from "moment";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");
const swiperHeight = height * 0.25;

export default function Calendar({ onValueChange }) {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  useEffect(() => {
    onValueChange(value.toDateString());
  }, [value]);

  const weeks = React.useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");

        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  return (
    <Swiper
      index={1}
      ref={swiper}
      loop={false}
      height={10}
      containerStyle={{
        height: 80,
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      showsPagination={false}
      onIndexChanged={(ind) => {
        if (ind === 1) {
          return;
        }
        setTimeout(() => {
          const newIndex = ind - 1;
          const newWeek = week + newIndex;
          setWeek(newWeek);
          setValue(moment(value).add(newIndex, "week").toDate());
          swiper.current.scrollTo(1, false);
        }, 100);
      }}>
      {weeks.map((dates, index) => (
        <View style={[styles.itemRow, { paddingHorizontal: 16, paddingVertical: 15 }]} key={index}>
          {dates.map((item, dateIndex) => {
            const isActive = value.toDateString() === item.date.toDateString();
            return (
              <TouchableWithoutFeedback
                key={dateIndex}
                onPress={() => {
                  setValue(item.date);
                }}>
                <View
                  style={[
                    styles.item,
                    isActive && {
                      backgroundColor: "#FAFAFA",
                      borderColor: "#111",
                    },
                  ]}>
                  <Text style={[styles.itemWeekday, isActive && { color: "#363D4F" }]}>
                    {item.weekday}
                  </Text>
                  <Text style={[styles.itemDate, isActive && { color: "#363D4F" }]}>
                    {item.date.getDate()}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#363D4F",
    flexDirection: "column",
    alignItems: "center",
  },
  itemRow: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#363D4F",
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#FAFAFA",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FAFAFA",
  },
});
