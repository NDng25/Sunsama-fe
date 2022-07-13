import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0) !important;
  clippath: inset(50%) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  white-space: nowrap !important;
  width: 1px !important;
`

const StyledCheckbox = styled.div`
  display: inline-block !important;
  width: 15px !important;
  height: 15px !important;
  background: ${props => (props.checked ? '#00FB2D' : '#A9FEB8')} !important;
  border-radius: 12px !important;
  transition: all 150ms !important;
  opacity: ${props => (props.checked ? 1 : 0.2)};

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink !important;
  }

  ${HiddenCheckbox}:hover + & {
    opacity: 1;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`

const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="-1 2 26 30">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Checkbox
