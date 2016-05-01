/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.ocelot.topic;

import javax.enterprise.context.ApplicationScoped;
import org.ocelotds.annotations.JsTopicControl;
import org.ocelotds.annotations.JsTopicControls;
import org.ocelotds.security.JsTopicAccessController;
import org.ocelotds.security.UserContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author hhfrancois
 */
@ApplicationScoped
@JsTopicControls({
	@JsTopicControl("mytopic1"),
	@JsTopicControl("mytopic2")
})
public class MultiSpecificTopicAC implements JsTopicAccessController {

	private static Logger logger = LoggerFactory.getLogger(MultiSpecificTopicAC.class);

	private boolean access = true;

	public boolean isAccess() {
		return access;
	}

	public void setAccess(boolean access) {
		this.access = access;
	}

	@Override
	public void checkAccess(UserContext ctx, String topic) throws IllegalAccessException {
		logger.debug("Check access to topic {} : access = {}", topic, access);
		if (!access) {
			throw new IllegalAccessException(topic+" access is set to false");
		}
	}

}
