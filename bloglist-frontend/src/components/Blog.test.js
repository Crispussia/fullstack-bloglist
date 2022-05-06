import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'



test('renders content', () => {
  const blog = {
    title: 'Securing DevOps',
    author: 'Julien Vehent',
    url: 'https://itbook.store/books/9781617294136',
    likes: 0,
    user: {
      username: 'crispussia',
      name: 'Degbelo Crispussia',
      id: '626851dc3161f9555a6aa5f4'
    }
  }

  const  { container } = render(
    <Blog blog={blog} user={blog.user} />
  )
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Securing DevOps'
  )

  expect(div).toHaveTextContent(
    'Julien Vehent'
  )

  expect(div).not.toHaveTextContent(
    'https://itbook.store/books/9781617294136'
  )
  expect(div).not.toHaveTextContent(
    0
  )
})

test('clicking the button displays url and likes', async () => {
  const blog = {
    title: 'Securing DevOps',
    author: 'Julien Vehent',
    url: 'https://itbook.store/books/9781617294136',
    likes: 0,
    user: {
      username: 'crispussia',
      name: 'Degbelo Crispussia',
      id: '626851dc3161f9555a6aa5f4'
    }
  }


  const component = render(
    <Blog blog={blog} user={blog.user} />
  )

  const button = component.getByText('view')
  const div=component.container
  expect(button).toBeDefined()
  const user = userEvent.setup()
  await user.click(button)


  expect(div).toHaveTextContent(
    'https://itbook.store/books/9781617294136'
  )

  expect(div).toHaveTextContent(
    0
  )
})



test('clicking likes 2 times', async () => {
  const blog = {
    title: 'Securing DevOps',
    author: 'Julien Vehent',
    url: 'https://itbook.store/books/9781617294136',
    likes: 0,
    user: {
      username: 'crispussia',
      name: 'Degbelo Crispussia',
      id: '626851dc3161f9555a6aa5f4'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLike={mockHandler} user={blog.user}/>
  )

  const view = component.getByText('view')
  expect(view).toBeDefined()
  const user = userEvent.setup()
  await user.click(view)

  const likes = component.getByText('like')
  expect(likes).toBeDefined()
  await user.click(likes)
  await user.click(likes)

  expect(mockHandler.mock.calls).toHaveLength(2)
})