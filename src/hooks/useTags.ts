import { ServiceTags } from '@/services/ServiceTags';
import { useStoreTags } from '@/stores/useStoreTags';
import { useEffect, useState } from 'react';
import { useSignedIn } from './useSignedIn';
import { REQUEST_STATUS } from '@/lib/constants/requests';
import { TypeTagsRegistry } from '@/lib/types/Tables';

export const useTags = () => {
  const { user } = useSignedIn();
  const tags = useStoreTags((store) => store.tags);
  const setTags = useStoreTags((store) => store.setTags);
  const addTag = useStoreTags((store) => store.addTag);
  const removeTag = useStoreTags((store) => store.removeTag);
  const requestStatus = useStoreTags((store) => store.requestStatus);
  const setRequestStatus = useStoreTags((store) => store.setRequestStatus);
  const [isInserting, setIsInserting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const create = async (tag: Omit<TypeTagsRegistry, 'id' | 'id_user'>) => {
    if (!user) return false;
    setIsInserting(true);
    const { data, error } = await ServiceTags.create({
      ...tag,
      id_user: user.id
    });
    if (!data || error) {
      setIsInserting(false);
      return false;
    }
    addTag(data);
    setIsInserting(false);
    return true;
  };
  const remove = async (id: number) => {
    if (!user) return false;
    setIsDeleting(true);
    const { data, error } = await ServiceTags.remove(id);
    if (error || data === false) {
      setIsDeleting(false);
      return false;
    }
    removeTag(id);
    setIsDeleting(false);
    return true;
  };
  useEffect(() => {
    if (!user) return;
    const loadTags = async (idUser: string) => {
      const { data, error } = await ServiceTags.findAll(idUser);
      if (error) return setRequestStatus(REQUEST_STATUS.error);
      setTags(data);
    };
    if (tags.length === 0 && requestStatus === REQUEST_STATUS.notStarted) {
      setRequestStatus(REQUEST_STATUS.loading);
      loadTags(user.id);
    }
  }, [tags, setTags, requestStatus, setRequestStatus, user]);

  return {
    tags,
    requestStatus,
    isInserting,
    isDeleting,
    create,
    remove
  };
};
