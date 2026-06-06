import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  RefreshControl,
} from "react-native";
import api from "../services/api";

export default function ComplaintList({ navigation }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Load complaints from server
  const load = async () => {
    try {
      const res = await api.get("getComplaints.php");
      setData(res.data);
    } catch (e) {
      console.log("Load Error:", e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Delete complaint with confirmation
  const del = (id) => {
    Alert.alert(
      "Delete Complaint",
      "Are you sure you want to delete this complaint?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.post("deleteComplaint.php", { id });
              load();
            } catch (e) {
              console.log("Delete Error:", e.message);
            }
          },
        },
      ]
    );
  };

  // Render each complaint item
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#4CAF50" }]}
          onPress={() => navigation.navigate("Edit", { item })}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#F44336" }]}
          onPress={() => del(item.id)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("Add")}
      >
        <Text style={styles.addText}>+ Add Complaint</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await load();
              setRefreshing(false);
            }}
          />
        }
        ListEmptyComponent={
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <Text>No complaints found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  item: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
    alignItems: "center",
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  desc: { fontSize: 14, color: "#555" },
  buttons: { flexDirection: "row" },
  btn: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 5,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});