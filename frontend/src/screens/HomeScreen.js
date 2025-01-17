import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { listBooks } from '../actions/bookActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import Paginate from '../components/Paginate'

const HomeScreen = ({history}) => {
  const dispatch = useDispatch()

  const bookList = useSelector(state=>state.bookList)
  const { loading, error, books ,page, pages} = bookList
  
  let keyword = history.location.search 
  useEffect(() => {
    dispatch(listBooks(keyword))
  }, [dispatch, keyword])
  
  return (
    <>
      <h1>Latest Books</h1> 
      {loading ? <Loader /> : error ? <Message variant='danger'>{error} </Message> :
        <div>
          <Row>
            {books.map(book => (
              <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                <Card className='my-3 rounded'>
                  <Link to={`/book/${book._id}`}>
                  <Card.Img src={book.coverImg} varient='top' />
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={ pages} keyword={keyword} />
        </div>
      }
      
    </>
  )
}

export default HomeScreen
