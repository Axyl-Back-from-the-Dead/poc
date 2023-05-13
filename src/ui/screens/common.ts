import { Colors, Constants, Styles } from "@metro/common";

// Derived from AliucordRN
export const commonStyles = Styles.createThemedStyleSheet({
    container: {
        flex: 1
    },
    list: {
        paddingVertical: 14,
        paddingHorizontal: 8
    },
    card: {
        borderRadius: 10,
        margin: 5,
        backgroundColor: Colors.colors.BACKGROUND_TERTIARY,
    },
    header: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    bodyCard: {
        backgroundColor: Colors.colors.BACKGROUND_SECONDARY,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    bodyText: {
        color: Colors.colors.TEXT_NORMAL,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 18,
        textAlignVertical: "top"
    },
    actions: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 12,
        paddingBottom: 10
    },
    iconsContainer: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    icons: {
        width: 24,
        height: 24,
        marginHorizontal: 4,
        tintColor: Colors.colors.INTERACTIVE_NORMAL
    },
    headerText: {
        fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
        color: Colors.colors.TEXT_NORMAL,
        fontSize: 16
    },
    link: {
        color: Colors.colors.TEXT_LINK
    },
    emptyPageImage: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: "10%"
    },
    emptyPageText: {
        marginTop: 10,
        color: Colors.colors.TEXT_NORMAL,
        fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
        textAlign: "center"
    },
    search: {
        margin: 0,
        marginBottom: 0,
        paddingBottom: 5,
        paddingRight: 15,
        paddingLeft: 15,
        backgroundColor: "none",
        borderBottomWidth: 0,
        background: "none"
    },
    button: {
        height: 34,
        paddingHorizontal: 16,
        marginLeft: 6
    },
    buttonIcon: {
        width: 14,
        height: 14,
        marginRight: 6,
        color: Colors.colors.TEXT_NORMAL
    },
    invalidHeader: {
        flexDirection: "column",
        flexWrap: "wrap"
    },
    invalidInfoText: {
        color: Colors.colors.TEXT_MUTED,
        fontSize: 12,
        fontWeight: "400"
    },
    warningText: {
        color: Colors.colors.TEXT_WARNING,
        fontFamily: Constants.Fonts.PRIMARY_NORMAL,
        fontSize: 12,
        paddingTop: 5
    },
});
