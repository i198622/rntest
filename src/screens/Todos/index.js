import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Modal, Alert, TouchableHighlight, ActivityIndicator, Image, StyleSheet } from 'react-native'
import axios from 'axios'
import { PRIMARY, WHITE, BLACK } from '../../constants'
import { Header } from '../../components'
import { SwipeListView } from 'react-native-swipe-list-view'
const NOTIF = [
  {
    id: 1,
    title: 'Your pizza order placed successfully',
    details: 'Your pizza order to snack corner has been accepted and being processed.',
  },
  {
    id: 2,
    title: 'Your bengali thali order has been delivered',
    details: 'Your bengali thali has been delivered by Delicious Bong Recipe.',
  },
  {
    id: 3,
    title: 'Out for delivery',
    details: 'Bengali thali will reach to you within 30 minutes.',
  },
  {
    id: 4,
    title: 'Your bengali thali order placed successfully',
    details: 'Your bengali thali order to Delicious Bong Recipe has been accepted and being processed.',
  },
  {
    id: 5,
    title: 'Money added to your wallet',
    details: '₹ 1,000/- has been added to your wallet successfully and remaining balance is ₹ 1,150/-',
  },
  {
    id: 6,
    title: 'Add money to your wallet',
    details: 'Only ₹ 150/- is left in your wallet. Add some more amount to place your order quickly.',
  },
  {
    id: 7,
    title: 'Check new Pizza Corner within 1 km',
    details: 'A new Pizza Corner is being loved by more people around you.',
  },
  {
    id: 8,
    title: 'Check new Roll Center within 3 km',
    details: 'A new roll center is being loved by more people around you.',
  },
  {
    id: 9,
    title: 'Check new Crispy Chicken within 3 km',
    details: 'A new Crispy Chicken is being loved by more people around you.',
  },
  {
    id: 10,
    title: 'Check new Snacks Corner within 5 km',
    details: 'A new Snacks Corner is being loved by more people around you.',
  },
]
const Todos = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [page, setPage] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)

  const { flatListViewStyle, modalContainer, modalItem, footer, separator, img } = styles

  useEffect(() => {
    fetchData()
    setModalVisible(true)
  }, [fetchData, setModalVisible])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const result = await axios(`https://picsum.photos/v2/list?page=${page}&limit=10`)
    setLoading(false)
    setDataSource(page === 1 ? result.data : [...dataSource, ...result.data])
  }, [page, dataSource])

  /*Flatlist*/
  const renderSeparator = () => {
    return <View style={separator} />
  }

  const renderFooter = () => {
    if (!loading) return null

    return (
      <View style={footer}>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  const handleLoadMore = () => {
    setPage(page + 1)
    fetchData()
  }

  const renderItem = ({ item }) => {
    const authorArray = item.author.split(' ')
    return (
      <TouchableHighlight>
        <View style={flatListViewStyle}>
          <Image source={{ uri: item.download_url }} style={img} />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{authorArray[0]}</Text>
            <Text>{authorArray[1]}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey)
    const newData = [...dataSource]
    const prevIndex = dataSource.findIndex((item) => item.id === rowKey)
    newData.splice(prevIndex, 1)
    setDataSource(newData)
  }

  const HiddenItemsWithActions = (props) => {
    const { onDelete } = props
    return (
      <View style={styles.rowBack}>
        <TouchableHighlight style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
          <Text style={{ color: 'white' }}>Delete</Text>
        </TouchableHighlight>
      </View>
    )
  }

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemsWithActions
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.id)}
        onDelete={() => deleteRow(rowMap, data.item.id)}
      />
    )
  }

  return (
    <>
      <Header nav={navigation} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Status', 'Modal has been closed.')
        }}
      >
        <View style={modalContainer}>
          <View style={modalItem}>
            <SwipeListView
              data={dataSource}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0}
              leftOpenValue={75}
              rightOpenValue={-75}
              disableRightSwipe
            />
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  flatListViewStyle: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: PRIMARY,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  separator: {
    height: 3,
    width: '100%',
    backgroundColor: WHITE,
    marginLeft: '14%',
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: WHITE,
  },
  img: { width: 60, height: 60, borderRadius: 60 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  modalItem: {
    width: 300,
    height: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    paddingRight: 15,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    height: 60,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    height: 80,
    right: 0,
    borderRadius: 10,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
})

export { Todos }

/*
     
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey)
    const newData = [...listData]
    const prevIndex = listData.findIndex((item) => item.key === rowKey)
    newData.splice(prevIndex, 1)
    setListData(newData)
  }

  const HiddenItemsWithActions = (props) => {
    const { onClose, onDelete } = props
    return (
      <View style={styles.rowBack}>
        <Text>Left</Text>
        <TouchableHighlight style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
          <Text style={{ color: 'white' }}>Close</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
          <Text style={{ color: 'white' }}>Delete</Text>
        </TouchableHighlight>
      </View>
    )
  }
  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemsWithActions
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    )
  }
<FlatList
              data={data}
              renderItem={({ item }) => (
                <View style={flatListViewStyle}>
                  <Image source={{ uri: item.download_url }} style={img} />
                  <Text>{item.author}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator}
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0}
            />
 */
