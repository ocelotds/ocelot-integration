/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.ocelot.cdi;

import java.io.Serializable;
import javax.enterprise.context.Dependent;
import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;

/**
 *
 * @author hhfrancois
 */
@DataService(resolver = Constants.Resolver.CDI)
@Dependent
public class CdiSessionBean implements Serializable {
	int value = 0;

	public int getValue() {
		return value++;
	}
}
