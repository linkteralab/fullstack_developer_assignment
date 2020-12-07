package com.linktera.linkteraquiz.service.base;

import java.util.List;
import java.util.UUID;

public interface BaseService<T> {

    List<T> getList();

    T get(UUID uuid);

    void save(T dto);

    void update(UUID uuid, T dto);

    void delete(UUID uuid);

}
