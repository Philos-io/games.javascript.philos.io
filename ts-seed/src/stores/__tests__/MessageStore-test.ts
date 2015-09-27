jest.autoMockOff()

import { MessageStore, IMessage } from '../MessageStore'
import { ITask } from '../TaskStore'
import { NewMessageAction } from '../../actions/Action'
import { List } from 'immutable'

describe('MessageStore', () => {
  let messageStore
  let message: IMessage
  let task: ITask
  let action

  beforeEach(() => {
    messageStore = new MessageStore()
    message = {
      id: '123',
      createdAt: new Date(),
      message: 'YOLO',
      author: 'Alexander Huber',
      taskId: '456'
    }
    task = {
      id: '456',
      createdAt: new Date(),
      children: List([]),
      assignedTo: List([]),
      completion: new Date(),
      dueDate: new Date(),
      conversation: List([message.id])
    }
    action = new NewMessageAction(message)
  })

  it('handles NewMessageAction action', () => {
    expect(messageStore.getById('123')).toBe(undefined)
    expect(messageStore.getByTask(task).equals(List([]))).toBe(true)
    expect(messageStore.getAll().equals(List([]))).toBe(true)

    expect(messageStore.dispatchCallback(action)).toBe(true)

    expect(messageStore.getById('123')).toBe(message)
    expect(messageStore.getByTask(task).equals(List([message]))).toBe(true)
    expect(messageStore.getAll().equals(List([message]))).toBe(true)
  })

  it('emits change event', () => {
    let listener = jest.genMockFunction()

    messageStore.on('change', listener)
    expect(messageStore.dispatchCallback(action)).toBe(true)

    expect(listener.mock.calls.length).toBe(1)
    expect(listener.mock.calls[0][0]).toBe(message)
  })
})