import { toast } from 'sonner'

/**
 * Hook for simplify API queries or mutations for delete
 * @param {*} entityName Name of The Query - Use for Toast Notification
 * @param {*} useInitAction Hook Action for Init Slice
 * @param {*} useDeleteMutation Mutation for Delete
 * @param {*} useDeleteAction Hook Action for Delete
 * @param {*} data Response of the Query
 * @param {*} isLoading Value of Query - Represents if it's Loading
 * @param {*} isSuccess Value of Query - Represents if it's Success
 * @param {*} isError Value of Query - Represents if the query has an Error
 * @param {*} error Value of Query - Represents an Error
 * @param {*} transformMethod Method for transform Objects to a better Object
 * @returns Returns initAllEntities and deleteEntities functions for use the parameters
 */
export const useManageAPI = (entityName, useInitAction, data, isLoading, isSuccess, isError, error, useDeleteMutation = null, useDeleteAction = null) => {
  const initAllEntities = () => {
    try {
      if (isSuccess && !isLoading) {
        if (entityName === 'Purchase' || entityName === 'Sale') {
          useInitAction(data)
        } else {
          useInitAction(data.filter(entity => entity.active === true))
        }
        toast.success(`${entityName} Data successfully added`, { duration: 1500, closeButton: true })
      } else if (isError) {
        throw new Error(error)
      }
    } catch (err) {
      toast.error(`Error while connecting: ${err.message}`, { duration: 2000, closeButton: true })
    }
  }

  const deleteEntities = async (entitiesToDelete) => {
    if (useDeleteMutation && useDeleteAction && entitiesToDelete.length) {
      for (const entity of entitiesToDelete) {
        try {
          const res = await useDeleteMutation(entity.id)
          if (res) {
            useDeleteAction(entity.id)
            toast.success(`${entityName}(s) deleted successfully`, { duration: 1500, closeButton: true })
          }
        } catch (err) {
          toast.error(`Error deleting ${entityName}: ${err.message}`, { duration: 2000, closeButton: true })
        }
      }
    }
  }

  return { initAllEntities, deleteEntities }
}
