import action_types from './Types/App_Config'

export function updateConfig(newConfig) {

  if (newConfig) {

    return {
      type: action_types.update_config,
      new_config: newConfig
    }
  }

}
