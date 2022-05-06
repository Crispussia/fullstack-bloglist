import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog= jest.fn()
  const component= render(<CreateBlog createBlog={createBlog} />)

  const inputTitle= component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')


  const create = component.getByText('create')
  expect(create).toBeDefined()

  const user = userEvent.setup()
  await user.type(inputTitle, 'Rust for Rustaceans'  )
  await user.type(inputAuthor, 'Jon Gjengset'  )
  await user.type(inputUrl, 'https://itbook.store/books/9781718501850' )
  await user.click(create)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Rust for Rustaceans' )
  expect(createBlog.mock.calls[0][0].author).toBe('Jon Gjengset' )
  expect(createBlog.mock.calls[0][0].url).toBe('https://itbook.store/books/9781718501850' )
})