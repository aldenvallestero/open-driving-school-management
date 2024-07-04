import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    // backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    // flexGrow: 1,
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
  },
});

export default function PDFview() {
  return (
    <PDFViewer style={{ width: "100%", height: "100em" }}>
      <Document
        title="PDF Document Title"
        author="Whoever wrote this"
        subject="Just a title"
        pageLayout="singlePage"
      >
        <Page size="A4" style={styles.page}>
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
            <Text style={styles.text}>Student Search Result Report</Text>

            <Text style={styles.text}>Name</Text>
            <Text style={styles.text}>Branch</Text>
            <Text style={styles.text}>Course</Text>
            <Text style={styles.text}>Instructor</Text>
            <Text style={styles.text}>Status</Text>
          </View>
          {/* <View style={styles.section}>
            <Text>Section #2</Text>
          </View> */}
        </Page>

        {/* sample/vacant */}
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>A1C Driving School</Text>
            <Text>Tumana, Santa Maria, 3022, Bulacan, PH</Text>

            {/* Report Title */}
            <Text>Student Search Result Report</Text>

            <Text>Name</Text>
            <Text>Branch</Text>
            <Text>Course</Text>
            <Text>Instructor</Text>
            <Text>Status</Text>
          </View>
          {/* <View style={styles.section}>
            <Text>Section #2</Text>
          </View> */}
        </Page>
      </Document>
    </PDFViewer>
  );
}
