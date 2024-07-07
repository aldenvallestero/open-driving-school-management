import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
  },
  text: {
    fontSize: 10,
    textAlign: "center",
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "#bfbfbf",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    // borderStyle: "solid",
    // borderWidth: 1,
    borderColor: "black",
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

export default function PDFview() {
  const RowHeader = () => {
    return (
      <View style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>#</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Name</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Course</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Branch</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Time in</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Time out</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Date</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Instructor</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Status</Text>
        </View>
      </View>
    );
  };
  return (
    <PDFViewer style={{ width: "60em", height: "100em" }}>
      <Document
        title="PDF Document Title"
        author="Whoever wrote this"
        subject="Just a title"
        pageLayout="singlePage"
      >
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.section}>
            <Image
              style={styles.logo}
              src={
                "https://www.shutterstock.com/shutterstock/photos/2236640723/display_1500/stock-vector-driving-school-logo-design-vector-templates-2236640723.jpg"
              }
            />
            <Text style={styles.title}>A1C Driving School</Text>
            <Text style={{ ...styles.text, marginBottom: 10 }}>
              Tumana, Santa Maria, 3022, Bulacan, PH
            </Text>
            <Text style={{ ...styles.title, marginBottom: 10 }}>Student Search Result Report</Text>

            <View style={styles.table}>
              <RowHeader />

              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>1</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Alden Vallestero</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>TDC</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Tumana, Santa Maria, Bulacan</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>10:00 AM</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>04:00 PM</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>01/01/2024</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Kalbo na aswang</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Done</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>

        <Page size="A4" style={styles.page}></Page>
        <Page size="A4" style={styles.page}></Page>
        <Page size="A4" style={styles.page}></Page>
        <Page size="A4" style={styles.page}></Page>
      </Document>
    </PDFViewer>
  );
}
