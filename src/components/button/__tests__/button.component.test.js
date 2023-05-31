import { screen, render } from '@testing-library/react'
import Button from '../button.component'
import { BUTTON_TYPE_CLASSES } from '../button.component'

describe('button test', () => {
  test('Should render base button when nothing is passed', () => {
    render(<Button />)

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveStyle('background-color: black')
  })

  test('Should render google button when passed google button type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />)

    const googleButtonElement = screen.getByRole('button')
    expect(googleButtonElement).toHaveStyle('background-color: #4285f4')
  })

  test('Should render inverted button when passed inverted button type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />)

    const googleButtonElement = screen.getByRole('button')
    expect(googleButtonElement).toHaveStyle('background-color: white')
  })

  test('Should be disabled if loading is true', () => {
    render(<Button isLoading={true} />)

    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeDisabled()
  })
})
