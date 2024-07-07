import { useContext } from "react";
import { Drawer } from "flowbite-react";
import { UserContext } from "../contexts/Context";

import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import PDFview from "../pages/pdf-page";

export function OffPage() {
  const { isDrawerOpen, handleDrawer } = useContext(UserContext);

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

  return (
    <Drawer open={isDrawerOpen} onClose={() => handleDrawer(false)}>
      <Drawer.Items>
        <PDFview />
      </Drawer.Items>
    </Drawer>
  );
}
