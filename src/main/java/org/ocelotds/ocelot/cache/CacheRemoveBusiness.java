/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.ocelot.cache;

import org.ocelotds.annotations.JsCacheRemove;

/**
 *
 * @author hhfrancois
 */
public class CacheRemoveBusiness {
	@JsCacheRemove(cls = CacheServices.class, methodName = "methodCached")
	public void removeCache() {
		
	}
}
