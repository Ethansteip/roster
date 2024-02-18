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
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    onValueChange(value.toDateString());
  }, [value]);

  // useEffect(async () => {
  //   const events = await getEvents("952");
  //   setEventData(events);
  //   console.log("Event Data: ", eventData);
  // }, []);

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
    <>
      <Swiper
        index={1}
        ref={swiper}
        loop={false}
        height={10}
        containerStyle={{ height: 90, flex: 0 }}
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
          <View
            style={[styles.itemRow, { paddingHorizontal: 16, paddingVertical: 15 }]}
            key={index}>
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
      {/* <TouchableOpacity onPress={resetDate}>
        <Text>Today</Text>
      </TouchableOpacity> */}
    </>
  );
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 12,
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
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
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#363D4F",
    marginHorizontal: -4,
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
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  swiperContainer: {
    height: swiperHeight,
  },
});
